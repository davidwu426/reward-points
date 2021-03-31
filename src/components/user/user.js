import React, {Component} from 'react';
import styles from './user.module.css';

class User extends Component{

    
    constructor(props){
        super(props);
        this.state =  {
            name :  "David",
            transactions : [],
            rewardPoints : 0,
            userId :  Math.trunc(Math.random() * 100)+1,
        }
        this.makeTransactionData = this.makeTransactionData.bind(this);
        this.calculateRewardPoints = this.calculateRewardPoints.bind(this);
    }

    componentDidMount(){
        this.makeTransactionData();
    }

    makeTransactionData(){
        let data = [];
        for(var i = 1 ; i < 31;i++){
            let total  = Math.round(((Math.random() * 200) + 50)*100)/100;
            let transactionObject = {
                userId :  this.state.userId,
                transactionId : i,
                total :  total
            }
            data.push(transactionObject);
        }
        this.setState({transactions :  data}, ()=>{
            this.calculateRewardPoints();
        })
    }

    calculateRewardPoints(){
        let totalSpent = 0;
        this.state.transactions.forEach(transaction=>{
            totalSpent += transaction.total;
        })
        totalSpent = Math.trunc(totalSpent);
        this.setState({totalSpent : totalSpent})
        let rewardPoints = 0;
        if(totalSpent > 100){
            rewardPoints = (totalSpent - 100) * 2 + 50;
        }else if(totalSpent > 50){
            rewardPoints = (totalSpent - 50)*1;
        }
        this.setState({rewardPoints :  rewardPoints});
    }

    render(){
        return(
        <div className = {styles.userContainer}>
            <h1>Welcome {this.state.name}!</h1>
            <div className= {styles.spendInfoContainer}>
                <div> Total spent is:{this.state.totalSpent} </div>
                <div>Your total reward points are  :  {this.state.rewardPoints}</div>
            </div>
        </div>
        )
    }
}

export default User;