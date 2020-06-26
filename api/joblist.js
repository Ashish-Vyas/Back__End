const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
//importing joblistSchema
const joblistSchema = require("../model/joblistSchema");
const detailSchema = require("../model/detailSchema");

router.get('/joblist', async(req, res)=>{
    try{
        const joblist = await joblistSchema.find();
        if(!joblist || joblist.length<1) 
        return res.json({message: "Nothing found"}) 
        return res.send(joblist);
    }
    catch(err){
        console.log(err);
        return res.json({message: "Error while fetching data"})
    }
})

router.get('/joblist/:jobdesc', async(req, res)=>{
    try{
            const jobname = req.params.jobdesc;
            const joblist = await joblistSchema.find({jobname: jobname});
            if(!joblist || joblist.length<1) 
            return res.json({message: "Nothing found"}) 
            return res.send(joblist);
    }
    catch(err){
        console.log(err);
        return res.json({message: "Error while fetching data"})
    }
})

router.post('/joblist/:jobdesc', (req, res)=>{
    try{
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files)=>{
            if(err){
                console.log(err);
                return res.json({message: "Error while uploading data"})

            }
            // console.log(fields, files);
            if(typeof(files.resume)!='undefined'){
                const tempPath = files.resume.path;
                let customName = files.resume.name.split('.'); 
                customName = fields.name +'_resume.'+ customName[customName.length - 1];
                console.log(customName);
                let newpath = path.join(__dirname, `../public/files/${customName}`);
                fs.copyFile(tempPath, newpath, (err)=>{
                    if(err){
                        console.log(err);
                        throw (err);

                    }
                })
                if(typeof(files.cover)!='undefined'){
                    const tempPath2 = files.cover.path;
                    var customName2 = files.cover.name.split('.'); 
                    customName2 = fields.name +'_cover.'+ customName2[customName2.length - 1];

                    let newpath2 = path.join(__dirname, `../public/files/${customName2}`);
                    fs.copyFile(tempPath2, newpath2, (err)=>{
                        if(err){
                            console.log(err);
                           throw (err);
    
                        }
                    })

                }

                var error = []
                
                

                const {name, email, city, phone, website } = fields; 
                if(!name) error.push("empty name");
                if(!email) error.push("empty email");
                if(!phone) error.push("empty phone");
                if(!city) error.push("empty city");
                if(!error || error.length<1){
                    if(!customName2)customName2="";                
                    const details = new detailSchema({name, email, city, phone, website, resume: customName, cover: customName2})
                    details.save((err, doc)=>{
                        if(err) throw (err);
                    })
                    return res.json({message: "Successful"});
                }
                else{
                    return res.json(error);
                }
                console.log(error);
               
            }
            else{
                return res.json({message: "Please upload resume"});
            }
            // fs.copyFile()
        
            // console.log(files.resume.path);
            // console.log(files);
            // console.log(path.join(__dirname, '../public/files'));
        })
    }
    catch(err){
        console.log(err);
        return res.json({message: "Error while submitting data"})
    }

})
module.exports = router;