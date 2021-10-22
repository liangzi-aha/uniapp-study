import { post } from './fetch';

const fetch = {
    login: (params)=>{
        return post('/login',params);
    },
    musicList: (params)=>{
        return post('/musicList',params);
    },
    addMusic: (params)=>{
        return post('/addMusic',params);
    },
    eidtMusic: (params)=>{
        return post('/eidtMusic',params);
    },
    delMusic: (params)=>{
        return post('/delMusic',params);
    },
    getMusicClassify: (params)=>{
        return post('/getMusicClassify',params);
    },
    addMusicClassify: (params)=>{
        return post('/addMusicClassify',params);
    },
    editClassifyBind: (params)=>{
        return post('/editClassifyBind',params);
    },
    editMusicClassify: (params)=>{
        return post('/editMusicClassify',params);
    },
    delMusicClassify: (params)=>{
        return post('/delMusicClassify',params);
    },
    userList: (params)=>{
        return post('/userList',params);
    },
    delUser: (params)=>{
        return post('/delUser',params);
    },
}

export default fetch;

