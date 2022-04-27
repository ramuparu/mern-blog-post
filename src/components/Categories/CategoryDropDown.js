import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { fetchingCategoryAction } from '../../redux/slices/category/category.reducer';



const CategoryDropDown = (props) => {
  const dispatch = useDispatch()
  useEffect(()=>{
     dispatch(fetchingCategoryAction())
  },[])
  const store = useSelector(state => state.category)
  const {loading} = store
  const allCategoryTypes = store?.categoryList?.message?.map(category =>{
      return{
         label : category?.title,
         value : category?._id
      }
  })

  //handle changes to
  const handleChange = value =>{
    props.onChange("category",value)
  }

  //handle blur

  const handleBlur = ()=>{
    props.onBlur("category",true)
  }
  return (
    <div style={{margin : "1rem 0"}}>
      {loading ? <h3 className="text-base text-green-600">Product categories list are loading please wait...</h3> :
      <Select id="category" onChange={handleChange} onBlur={handleBlur} options={allCategoryTypes} value={props?.value?.label} />

    }
    {props?.error && <div style={{color: 'red',marginTop : ".5rem"}}>{props?.error}</div>}
    </div>
    
  )
}

export default CategoryDropDown
