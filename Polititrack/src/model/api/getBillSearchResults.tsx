import { gql, useQuery } from '@apollo/client';
import { Status } from './helpers';

export interface BillSearchResults {
  status: Status;
  errorMessage: string;
  jurisdiction: string;
  billType: string;
  data: BillSearchNode[];
}

export interface BillSearchNode {
  id: string;
  name: string;
}

export const BILL_SEARCH_QUERY = gql`
  query getBillSearch(
    $jurisdiction: String!
    $session: String!
    $searchQuery: String!
  ) {
    bills(
      jurisdiction: $jurisdiction
      session: $session
      searchQuery: $searchQuery
      first: 30
    ) {
      edges {
        node {
          title
          id
        }
      }
    }
  }
`;

/**
 * Gets the search result bills
 * @param requestParams - the request
 *        legislature - the legislature/jurisdiction to search
 *        session - the legislative session to search
 *        billType - the bill subject that the user wants to lookup
 * @returns - a list of bills meeting the search criteria
 */
export function getBillSearchResults(
  requestParams: string[]
): BillSearchResults {
  const billSearchResults: BillSearchResults = {
    status: Status.Loading,
    errorMessage: '',
    jurisdiction: requestParams[0],
    billType: requestParams[2],
    data: [],
  };
  const { loading, error, data } = useQuery(BILL_SEARCH_QUERY, {
    variables: {
      jurisdiction: requestParams[0],
      session: requestParams[1],
      searchQuery: requestParams[2],
    },
  });

  if (loading) {
    return billSearchResults;
  }
  if (error) {
    billSearchResults.status = Status.Error;
    billSearchResults.errorMessage = error.message;
    return billSearchResults;
  }
  billSearchResults.status = Status.Success;
  let wrapper: {
    node: {
      id: '';
      title: '';
    };
  };
  for (wrapper of data.bills.edges) {
    billSearchResults.data.push({
      id: wrapper.node.id,
      name: wrapper.node.title,
    });
  }
  return billSearchResults;
}
