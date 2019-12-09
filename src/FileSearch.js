import React, { Component } from 'react';
import Botui from "botui-react";

class FileSearch extends Component {
    state = {
        isLoading: true,
        groups: []
    };

    async search(term) {
        let self = this;
        await fetch(`/search/${term}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                let answer = response.json().then(data => {
                    console.log(data)

                    self.botui.message.bot({
                        // content: answer.toString(),
                        content: data,
                        delay: 100
                    });

                })
            }
            else {
                let answer = response.text().then(text => {
                    console.log(text)

                    self.botui.message.bot({
                        // content: answer.toString(),
                        content: text,
                        delay: 100
                    });

                });
            }
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
            <div>Brute force search chatbot
                <Botui ref={ cmp => this.botui = cmp }/>
            </div>
        )
    }
}

export default FileSearch;