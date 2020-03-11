import React, { useEffect, useContext } from 'react';
import { Divider } from 'antd';
import styled from 'styled-components';
import { useActions } from '../hooks';
import { Context } from '../context/AppContext';
import * as actions from '../actions';



const TransactionDetails = ({ match, className }) => {
  const { iban } = match.params;
  const { state } = useContext(Context);
  const { getTransationDetails } = useActions(actions);
  const { account, accountName, amount, transactionType, currencyCode } = state.details;

  useEffect(() => {
    getTransationDetails(iban)
  }, [])

  return (
    <div className={className}>
      <h1>Transaction {account}</h1>
      <Divider orientation="center" />
      <div><strong>Account NO.:</strong>{account}</div>
      <div><strong>Account Name:</strong>{accountName}</div>
      <div><strong>Currency Code:</strong>{currencyCode}</div>
      <div><strong>Amount</strong>{amount}</div>
      <div><strong>Transaction Type:</strong>{transactionType}</div>

    </div>
  )
}
export default styled(TransactionDetails)`
  padding: 20px;
`;