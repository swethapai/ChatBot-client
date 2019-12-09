import React, { Component } from 'react';
import Botui from "botui-react";

class Lucene extends Component {
    state = {
        isLoading: true,
        groups: []
    };

    async search(term) {
        let self = this;
        await fetch(`/lucene/${term}`, {
            method: 'GET',
        }).then((response) => {
                let answer = response.text().then(data => {
                    console.log(data)

                    self.botui.message.bot({
                        content: data,
                        delay: 100
                    });

                })
        });
    }

    async showMenu(){
        let self = this;
        this.botui.action.text({
            delay: 100,
            action: {
                placeholder: "Enter the search term"
            }
        }).then(function (res) {
            console.log("res.value-" + res.value);
            let answer = self.search(res.value);

        }).then(function (res) {
            self.showMenu();
        });
    }


    async componentDidMount() {
        const self = this;
        const response = await fetch('/message');
        // console.log(response.json());
        const body = await response.json();
        this.setState({ groups: body.text, isLoading: false });


        this.botui.message.bot({
            content: "Hello! Welcome to the Chatbot!",
        });
        return this.botui.action.text({
            delay: 100,
            action: {
                placeholder: "Enter the search term"
            }
        }).then(function(res) {
                console.log("res.value-" + res.value);
                self.search(res.value).then(data => {

                })
                    .then(function () {
                        self.showMenu();
                    })
            }
        )
    }

    render() {
        return (
        <div>Lucene
            <Botui ref={ cmp => this.botui = cmp }/>
        </div>
        )
    }
}

export default Lucene;