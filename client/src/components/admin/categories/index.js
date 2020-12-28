import React, { Fragment  } from 'react';
import AdminLayout from "../layout";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Table } from "react-bootstrap";


const RenderCategories = (props) => {

    const category = useSelector((state) => state.category);
    console.log(category)
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          
            {category.categories.map((category) => (
                <tr key={category._id}>
                  <td>2</td>
                  <td>{category.name}</td>
                
                 
                </tr>
              ))
} 
        </tbody>
      </Table>
    );
  };


const HeaderComponent = ()=>{
   
    return (
        <div className="grid grid-cols-1 space-y-4 p-4">
			<h5 >hello from categories</h5> 
            <Row>
          <Col>{RenderCategories()}</Col>
        </Row>
            
		</div>
    )
}
const Categories = (props) => {
    return (
        <Fragment>
	    		<AdminLayout  children={<HeaderComponent/>}   />
	    </Fragment>
    )
}

export default Categories;