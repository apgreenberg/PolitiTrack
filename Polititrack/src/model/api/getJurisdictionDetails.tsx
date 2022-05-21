import { gql, useQuery } from '@apollo/client';
import { Status } from './helpers';
import axios, { AxiosResponse } from 'axios';
import OPENSTATES_OAUTH_TOKEN from '../../types/env';

export interface JurisdictionDetails {
  status: Status;
  errorMessage: string;
  data: JurisdictionDetailNode;
}

export interface JurisdictionDetailNode {
  identifier: string;
  name: string;
  inSession: boolean;
  startDate: string;
  endDate: string;
}

export interface GetJurisdictionDetailsResponse {
  data: {
    jurisdiction: {
      legislativeSessions: {
        edges: GetJurisdictionDetailsResponseNode[];
      };
    };
  };
}

export interface GetJurisdictionDetailsResponseNode {
  node: {
    identifier: string;
    name: string;
    startDate: string;
    endDate: string;
  };
}

export const JURISDICTION_DETAILS_QUERY = `
  query getJurisdictionDetails($id: String!) {
    jurisdiction(id: $id) {
      legislativeSessions(first: 30) {
        edges {
          node {
            identifier
            name
            startDate
            endDate
          }
        }
      }
    }
  }
`;

/**
 * Gets the jurisdiction details
 * @param requestParams - the request parameters (jurisdiction id)
 * @returns - the status of the request (loading, error or success) and the jurisdiction details on success
 */
export function getJurisdictionDetails(
  requestParams: string[]
): JurisdictionDetails {
  const { loading, error, data } = useQuery(
    gql`
      ${JURISDICTION_DETAILS_QUERY}
    `,
    {
      variables: { id: requestParams[0] },
    }
  );

  const jurisdictionDetails: JurisdictionDetails = {
    status: Status.Loading,
    errorMessage: '',
    data: {
      identifier: '',
      name: 'Currently not in session',
      inSession: false,
      startDate: 'NA',
      endDate: 'NA',
    },
  };

  if (loading) {
    return jurisdictionDetails;
  }
  if (error) {
    jurisdictionDetails.status = Status.Error;
    jurisdictionDetails.errorMessage = error.message;
    return jurisdictionDetails;
  }
  jurisdictionDetails.status = Status.Success;
  findCurrentSession(
    jurisdictionDetails,
    data.jurisdiction.legislativeSessions.edges
  );
  return jurisdictionDetails;
}

/**
 * Same as getJurisdictionDetails, but uses Axios instead of Apollo hooks
 * Necessary for background updates
 * @param requestParams - the request parameters (jurisdiction id)
 * @returns - the status of the request (error or success) and the jurisdiction details on success
 */
export async function getJurisdictionDetailsAxios(
  requestParams: string[]
): Promise<JurisdictionDetails> {
  const jurisdictionDetails: JurisdictionDetails = {
    status: Status.Loading,
    errorMessage: '',
    data: {
      identifier: '',
      name: 'Currently not in session',
      inSession: false,
      startDate: 'NA',
      endDate: 'NA',
    },
  };
  try {
    const response: AxiosResponse<GetJurisdictionDetailsResponse> = await axios(
      {
        url: 'https://openstates.org/graphql',
        method: 'post',
        headers: {
          'X-API-KEY': `${OPENSTATES_OAUTH_TOKEN}`,
        },
        data: {
          query: JURISDICTION_DETAILS_QUERY,
          variables: {
            id: requestParams[0],
          },
        },
      }
    );
    jurisdictionDetails.status = Status.Success;
    findCurrentSession(
      jurisdictionDetails,
      response.data.data.jurisdiction.legislativeSessions.edges
    );
    return jurisdictionDetails;
  } catch {
    (error: Error) => {
      jurisdictionDetails.status = Status.Error;
      jurisdictionDetails.errorMessage = error.message;
      return jurisdictionDetails;
    };
  }
  return jurisdictionDetails;
}

/**
 * Given an array of legislative sessions, finds the current one if possible
 * @param jurisdictionDetails - the current jurisidiction details
 * @param sessions - the possible legislative sessions
 */
function findCurrentSession(
  jurisdictionDetails: JurisdictionDetails,
  sessions: GetJurisdictionDetailsResponseNode[]
): void {
  let wrapper = {
    node: {
      identifier: '',
      name: '',
      startDate: '',
      endDate: '',
    },
  };
  for (wrapper of sessions) {
    if (Date.parse(wrapper.node.endDate) > Date.parse(Date())) {
      jurisdictionDetails.data.identifier = wrapper.node.identifier;
      jurisdictionDetails.data.name = wrapper.node.name;
      jurisdictionDetails.data.inSession = true;
      jurisdictionDetails.data.startDate = wrapper.node.startDate;
      jurisdictionDetails.data.endDate = wrapper.node.endDate;
      break;
    }
  }
}
