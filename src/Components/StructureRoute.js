import React from 'react';
import Structure from "./Structure";
import { Route } from "react-router-dom"; 

function StructureRoute() {

    const { element: Component, ...rest } = this.props;

    return (
        <Route {...rest} render={(props) =>
			{
				return <Structure><Component {...props} /></Structure>
			}} 
        />
    )
}

export default StructureRoute
