import React from 'react'
import  {css} from '@emotion/react'
import { RiseLoader } from 'react-spinners'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const Loaderspinner = () => {
  return (
    <RiseLoader color='red' loading={true} css={override} />
  )
}

export default Loaderspinner