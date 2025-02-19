import React from "react";
import axios from "axios";
import { Dialog } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { DialogTitle} from "@material-ui/core";
import { DialogContent} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class CustomerAdd extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
        file: null,
        userName: "",
        birthday: "",
        gender: "",
        job: "",
        fileName: "",
        open: false
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })
        this.setState({
            file: null,
            userName: "",
            birthday: "",
            gender: "",
            job: "",
            fileName: "",
            open: false
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    addCustomer = () => {
        console.log("addCustomer 1");
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return axios.post(url, formData, config);
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            file: null,
            userName: "",
            birthday: "",
            gender: "",
            job: "",
            fileName: "",
            open: false
        })
    }

    render() {
        const { classes } = this.props;
      return (
        <div>
            <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                고객 추가하기
            </Button>
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle>고객 추가</DialogTitle>
                <DialogContent>
                    <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" color="primary" component="span" name="file">
                            {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                        </Button>
                    </label><br/>
                    <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                    <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                    <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                    <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                    <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
        /*
        <div>
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>
            </form>
        </div>
        */
      )
    }
}

export default withStyles(styles) (CustomerAdd);
    