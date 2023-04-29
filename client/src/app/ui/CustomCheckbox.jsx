import { Checkbox } from '@mui/material'
import React from 'react'

const CheckboxIcon = ({ checked = false }) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14 7L8.5 12.5L6 10'
        stroke={checked ? '#424242' : 'none'}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <rect x='0.5' y='0.5' width='19' height='19' rx='3.5' stroke='#C4C4C4' />
    </svg>
  )
}

const styles = {
  root: {
    padding: 1.5,
    '&:hover svg rect': {
      stroke: '#616161'
    }
  }
}

const CustomCheckbox = React.forwardRef((props, ref) => (
  <Checkbox
    {...props}
    icon={<CheckboxIcon checked={false} />}
    checkedIcon={<CheckboxIcon checked={true} />}
    disableRipple={true}
    sx={styles.root}
    indeterminate={false}
  />
))

export default CustomCheckbox
