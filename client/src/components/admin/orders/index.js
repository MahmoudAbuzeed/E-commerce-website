import React, { Fragment } from 'react';
import AdminLayout from "../layout";


const HeaderComponent = ()=>{
    return (
        <div className="grid grid-cols-1 space-y-4 p-4">
			<h5 >hello from orders</h5> 
		</div>
    )
}
const Orders = (props) => {
    return (
        <Fragment>
	    		<AdminLayout children={<HeaderComponent/>}/>
               
	    	
	    </Fragment>
    )
}

export default Orders;