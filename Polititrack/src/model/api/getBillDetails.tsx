import { gql, useQuery } from '@apollo/client';
import { Status } from './helpers';
import axios, { AxiosResponse } from 'axios';
import OPENSTATES_OAUTH_TOKEN from '../../types/env';

export interface BillDetails {
  status: Status;
  errorMessage: string;
  data: BillDetailNode;
}

export interface BillDetailNode {
  title: string;
  from: string;
  openstatesUrl: string;
  updatedAt: string;
}

export interface GetBillDetailsResponse {
  data: {
    bill: {
      fromOrganization: {
        name: string;
      };
      title: string;
      openstatesUrl: string;
      updatedAt: string;
    };
  };
}

export const BILL_DETAILS_QUERY = `
  query getBillDetails($id: String!) {
    bill(id: $id) {
      title
      openstatesUrl
      updatedAt
      fromOrganization {
        name
      }
    }
  }
`;

/**
 * Gets the bill details
 * @param requestParams - the request parameters (bill id)
 * @returns - the status of the request (loading, error or success) and the bill details on success
 */
export function getBillDetails(requestParams: string[]): BillDetails {
  const billDetails: BillDetails = {
    status: Status.Loading,
    errorMessage: '',
    data: { title: '', from: '', openstatesUrl: '', updatedAt: '' },
  };
  const { loading, error, data } = useQuery(
    gql`
      ${BILL_DETAILS_QUERY}
    `,
    {
      variables: {
        id: requestParams[0],
      },
    }
  );

  if (loading) {
    return billDetails;
  }
  if (error) {
    billDetails.status = Status.Error;
    billDetails.errorMessage = error.message;
    return billDetails;
  }
  billDetails.status = Status.Success;
  billDetails.data.title = data.bill.title;
  billDetails.data.openstatesUrl = data.bill.openstatesUrl;
  billDetails.data.updatedAt = data.bill.updatedAt;
  billDetails.data.from = data.bill.fromOrganization.name;
  return billDetails;
}

/**
 * Gets the bill details but using Axios instead of Apollo hooks
 * Necessary for background updates
 * @param requestParams - the request parameters (bill id)
 * @returns - the status of the request (loading, error or success) and the bill details on success
 */
export async function getBillDetailsAxios(
  requestParams: string[]
): Promise<BillDetails> {
  const billDetails: BillDetails = {
    status: Status.Loading,
    errorMessage: '',
    data: { title: '', from: '', openstatesUrl: '', updatedAt: '' },
  };
  try {
    const response: AxiosResponse<GetBillDetailsResponse> = await axios({
      url: 'https://openstates.org/graphql',
      method: 'post',
      headers: {
        'X-API-KEY': `${OPENSTATES_OAUTH_TOKEN}`,
      },
      data: {
        query: BILL_DETAILS_QUERY,
        variables: {
          id: requestParams[0],
        },
      },
    });
    billDetails.status = Status.Success;
    billDetails.data.title = response.data.data.bill.title;
    billDetails.data.openstatesUrl = response.data.data.bill.openstatesUrl;
    billDetails.data.updatedAt = response.data.data.bill.updatedAt;
    billDetails.data.from = response.data.data.bill.fromOrganization.name;
    return billDetails;
  } catch {
    (error: Error) => {
      billDetails.status = Status.Error;
      billDetails.errorMessage = error.message;
      return billDetails;
    };
  }
  return billDetails;
}
