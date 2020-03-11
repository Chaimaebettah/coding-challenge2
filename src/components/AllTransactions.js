import React from 'react';
import { useHistory } from "react-router-dom";
import { Table } from 'antd';
import styled from 'styled-components';

const columns = [
  {
    title: 'ACCOUNT NO.',
    dataIndex: 'account',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.account - b.account,
  },
  {
    title: 'ACCOUNT NAME',
    dataIndex: 'accountName',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.accountName - b.accountName,
  },
  {
    title: 'CURRENCY',
    dataIndex: 'currencyCode',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.currencyCode - b.currencyCode,
  },
  {
    title: 'AMOUNT',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: 'TRANSACTION TYPE',
    dataIndex: 'transactionType',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.transactionType - b.transactionType,
  },
]


const AllTransactions = ({ className, data, loading, pageSize, total, onChange }) => {
  const history = useHistory();

  // getTransationDetails
  const onRowClick = (e) => {
    history.push(`/${e.iban}`)
  }

  return (
    <Table
      className={className}
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize, total }}
      rowKey={record => record.iban}
      onRow={record => ({ onClick: () => onRowClick(record) })}
      onChange={onChange}
    />
  )
}

export default styled(AllTransactions)`

`;