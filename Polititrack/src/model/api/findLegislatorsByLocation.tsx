import { gql, useQuery } from '@apollo/client';
import { Status } from './helpers';

export interface LegislatorSearchResults {
  status: Status;
  errorMessage: string;
  data: LegislatorSearchNode[];
}

export interface LegislatorSearchNode {
  id: string;
  name: string;
}

export const FIND_LEGISLATORS_BY_LOCATION_QUERY = gql`
  query findLegislatorByLocation($latitude: Float!, $longitude: Float!) {
    people(latitude: $latitude, longitude: $longitude, first: 10) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

/**
 * Gets the user's legislators based on the location of their device
 * @param requestParams - the request parameters (latitude, longitude)
 * @returns - the status of the request (loading, error or success) and the user's legislators on success
 */
export function findLegislatorsByLocation(
  requestParams: string[]
): LegislatorSearchResults {
  const legislatorSearchResults: LegislatorSearchResults = {
    status: Status.Loading,
    errorMessage: '',
    data: [],
  };
  const { loading, error, data } = useQuery(
    FIND_LEGISLATORS_BY_LOCATION_QUERY,
    {
      variables: {
        latitude: parseFloat(requestParams[0]),
        longitude: parseFloat(requestParams[1]),
      },
    }
  );

  if (loading) {
    return legislatorSearchResults;
  }
  if (error) {
    legislatorSearchResults.status = Status.Error;
    legislatorSearchResults.errorMessage = error.message;
    return legislatorSearchResults;
  }
  legislatorSearchResults.status = Status.Success;
  let wrapper: {
    node: {
      id: '';
      name: '';
    };
  };
  for (wrapper of data.people.edges) {
    legislatorSearchResults.data.push({
      id: wrapper.node.id,
      name: wrapper.node.name,
    });
  }
  return legislatorSearchResults;
}
