import { gql, useQuery } from '@apollo/client';
import { Status } from './helpers';

export interface LegislatorDetails {
  status: Status;
  errorMessage: string;
  data: LegislatorDetailNode;
}

export interface LegislatorDetailNode {
  email: string;
  image: string;
  party: string;
}

export const LEGISLATOR_DETAILS_QUERY = gql`
  query getLegislatorDetails($id: ID!) {
    person(id: $id) {
      email
      image
      primaryParty
    }
  }
`;

/**
 * Gets the legislator details
 * @param requestParams - the request parameters (legislator id)
 * @returns - the status of the request (loading, error or success) and the legislator details on success
 */
export function getLegislatorDetails(
  requestParams: string[]
): LegislatorDetails {
  const legislatorDetails: LegislatorDetails = {
    status: Status.Loading,
    errorMessage: '',
    data: { email: '', image: '', party: '' },
  };
  const { loading, error, data } = useQuery(LEGISLATOR_DETAILS_QUERY, {
    variables: {
      id: requestParams[0],
    },
  });

  if (loading) {
    return legislatorDetails;
  }
  if (error) {
    legislatorDetails.status = Status.Error;
    legislatorDetails.errorMessage = error.message;
    return legislatorDetails;
  }
  legislatorDetails.status = Status.Success;
  legislatorDetails.data.email = data.person.email;
  legislatorDetails.data.image = data.person.image;
  legislatorDetails.data.party = data.person.primaryParty;
  return legislatorDetails;
}
