import React, { Component } from 'react';
import Botui from "botui-react";

class MongoDB extends Component {
    state = {
        isLoading: true,
        groups: []
    };

    async search(term) {
        let self = this;
        await fetch(`/mongo/${term}`, {
            method: 'GET',
        }).then((response) => {
            let answer = response.text().then(data => {
                console.log(data)

                return self.botui.message.bot({
                    content: data,
                    delay: 100
                });

            })
        }).then(function() {
            self.showMenu();
        })
    }

    async searchRunningEvent(month, date, year) {
        let self = this;
        await fetch(`/mongo/running/${month}/${date}/${year}`, {
            method: 'GET',
        }).then((response) => {
            let answer = response.text().then(data => {
                console.log(data)

                return self.botui.message.bot({
                    content: data,
                    delay: 100
                });

            })
        }).then(function() {
            self.showMenu();
        })
    }

    //small change

    async showMenu(){
        let self = this;
        this.botui.message.add({
            delay:1000,
            content: 'What would you like to search?'
        }).then(function() {
            return self.botui.action.button({
                delay: 300,

                action: [
                    {
                        text: 'Running event',
                        value: 'running'
                    },
                    {
                        text: 'No. of steps walked',
                        value: 'steps'
                    },
                ]
            }).then(function (res) {
                if(res.value=='running')
                    self.running();
                else
                    self.stepsWalked();
            })
        });
    }

    async running() {
        let self = this;
        let month, date, year;

        this.botui.message.add({
            delay: 100,
            content: "Enter the month"
        }).then(function () {
            return self.botui.action.text({
                delay: 100,
                action: {
                    placeholder: "Eg: apr, jun, mar"
                }
            })
        }).then(function (res) {
            console.log("res.value-" + res.value);
            month = res.value;

            self.botui.message.add({
                delay: 50,
                content: "Enter the date"
            })
        }).then(function () {
            return self.botui.action.text({
                delay: 100,
                action: {
                    placeholder: "Eg: 11, 27, 3"
                }
            })
        }).then(function (res) {
            date = res.value
            self.botui.message.add({
                delay: 50,
                content: "Enter the year"
            })
        }).then(function() {
                        return self.botui.action.text({
                            delay: 100,
                            action: {
                                placeholder: "Eg: 2017, 2005"
                            }
                        })
            }).then(function (res) {
            year = res.value
            self.searchRunningEvent(month, date, year);
        });
    }


    async stepsWalked() {
        let self = this;

        this.botui.action.text({
            delay: 100,
            action: {
                placeholder: "Eg: How many steps did I walk on apr 11 2017?"
            }
        }).then(function(res) {
            console.log("res.value-" + res.value);
            self.search(res.value).then(data => {

            })
        });

    }


    async componentDidMount() {
        const self = this;
        const response = await fetch('/message');
        // console.log(response.json());
        const body = await response.json();
        this.setState({ groups: body.text, isLoading: false });


        this.botui.message.add({
            delay:100,
            content: 'What would you like to search?'
        }).then(function() {
            return self.botui.action.button({
                delay: 300,

                action: [
                    {
                        text: 'Running event',
                        value: 'running'
                    },
                    {
                        text: 'No. of steps walked',
                        value: 'steps'
                    },
                ]
            }).then(function (res) {
                if(res.value=='running')
                    self.running();
                else
                    self.stepsWalked();
            })
    });
    }

    render() {
        return (
            <div>MongoDB search
                <Botui ref={ cmp => this.botui = cmp }/>
            </div>
        )
    }
}

export default MongoDB;