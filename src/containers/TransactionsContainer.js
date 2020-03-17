
import React, { useState, useEffect, useContext } from 'react';
import 'antd/dist/antd.css';
import styled from 'styled-components'
import AllTransactions from '../components/AllTransactions.js';
import AccountName from '../components/AccountName';
import TransactionType from '../components/TransactionType';
import * as actions from '../actions';
import { Context } from '../context/AppContext';
import { useActions } from '../hooks';


const TransactionsContainer = ({ className }) => {
  const { state } = useContext(Context)
  const { getTransations, toggleFilter, sortAndPaginate } = useActions(actions)
  const { list, loading, filters, sortOrder, sortBy, skip, limit, total } = state;

  useEffect(() => {
    const params = {
      filters: filters.filter(filter => filter.active),
      sortOrder,
      sortBy,
      skip,
      limit
    }
    getTransations(params);
  }, [filters, sortOrder, sortBy, skip, limit])

  const accountNameFilters = filters.filter(filter => filter.category === 'accountName');
  const transactionTypeFilters = filters.filter(filter => filter.category === 'transactionType');

  return (
    <div className={className}>
      <div className="checkbox-container">
        <h2>Filters</h2>
        <AccountName filters={accountNameFilters} onChange={toggleFilter} />
        <TransactionType filters={transactionTypeFilters} onChange={toggleFilter} />
      </div>
      <div className="transactions-table-container">
        <AllTransactions
          data={list}
          loading={loading}
          pageSize={limit}
          total={total}
          onChange={(pagination, filters, sorter) => {
            console.log(sorter, 'sorter')
            console.log(pagination, 'pagination')

            const mappedOrder = {
              'ascend': 'asc',
              'descend': 'desc'
            }

            const sortBy = sorter.columnKey;
            const sortOrder = sorter.order ? mappedOrder[sorter.order] : 'desc';
            const skip = (pagination.current * limit) - limit;
            sortAndPaginate({
              sortBy,
              sortOrder,
              skip,
            })
          }}
        />
      </div>
    </div>
  );
}

export default styled(TransactionsContainer)`
    display: flex;

    .checkbox-container {
        width: 250px;
        margin: 10px 20px;
    }

    .transactions-table-container {
        flex: 1;
    }

`;