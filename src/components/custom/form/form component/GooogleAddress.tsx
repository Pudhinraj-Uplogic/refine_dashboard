import { Form } from 'antd'
import React from 'react'
import type { FormItems } from '../types.form';

const GooogleAddress = (formItem:FormItems) => {
    const {
        type,
        name,
        initialValue,
        rules,
        options,
        disabled,
        placeholder,
        format,
        row,
        ...rest
      } = formItem;
  return (
    <Form.Item
    style={{ width: "100%", padding: "0", margin: "0" }}
    initialValue={initialValue ? initialValue : null}
    name={name}
    rules={rules}>
    <input type="text" placeholder={placeholder || "eg. John Doe"} disabled={disabled} />
  </Form.Item>
  )
}

export default GooogleAddress