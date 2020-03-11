import React from 'react';
import { Checkbox } from 'antd';
import styled from 'styled-components'


const AccountName = ({ className, filters, onChange }) => {
  return (
    <div className={className}>
      <h3>Account Name</h3>
      {filters.map(filter => {
        return (
          <Checkbox
            key={filter.value}
            checked={filter.active}
            onChange={(e) => onChange({ ...filter, active: !filter.active })}
          >
            {filter.value}
          </Checkbox>
        )
      })}
    </div>
  )
}

export default styled(AccountName)`
    background-color: #e8e8e8;
    padding: 10px;
    margin: 10px;

  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0;
  }

`;