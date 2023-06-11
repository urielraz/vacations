import "./Reports.css";

import React, { Component } from 'react';
import CanvasJSReact from '../../../Assets/canvasjs-3.7.5/canvasjs.react';
import followService from "../../../Services/FollowService";
import  { useEffect, useState } from 'react';
import notifyService from "../../../Services/NotifyService";
import vacationsService from '../../../Services/VacationsService';
import VacationModel from "../../../Models/VacationModel";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
function Test(){

	const [followers, setFollowers] = useState<number>(0)
    const [vacation, setVacation] = useState<VacationModel[]>([]);

	
    useEffect(()=>{
		
		vacationsService.getAllVacations()
		.then(vacation =>{setVacation(vacation)})
		.catch(err => notifyService.error(err))
		

        followService.getCountOfFollowersByVacation(61)
        .then(followers =>{
            setFollowers(followers);
            // console.log(followers);
        })
        .catch(err => notifyService.error(err)) 

    },[])
	return [

		{y: followers , label: vacation[57]?.destination}
	]
}
function Reports2(){
		const options = {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: "Most Popular Vacataions"
			},
			axisX: {
				title: "Vacataions",
				reversed: true,
			},
			axisY: {
				title: "Followers",
				includeZero: true,
				labelFormatter: AddSymbols
			},
			data: [{
				type: "bar",
				dataPoints: Test()
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
	function AddSymbols(e:any){
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}

export default Reports2;     


