
export default{
    state:{
        jobs: []
    },
    mutations:{
        addJobs(state,job){
            state.jobs.push(job)
            state.jobs.sort(function(a, b){return a.jobPriority - b.jobPriority});
        },
        setJobs(state,jobs){
            jobs.sort(function(a, b){return a.jobPriority - b.jobPriority});
            state.jobs = jobs
        },
        updateJob(state,job){
            let jobIndex = state.jobs.findIndex(item => item._id == job._id)
            state.jobs[jobIndex].jobPriority = job.jobPriority
            state.jobs.sort(function(a, b){return a.jobPriority - b.jobPriority});
        },
        deleteJob(state,job){
            let jobIndex = state.jobs.findIndex(item => item._id == job._id)
            state.jobs.splice(jobIndex,1)
            state.jobs.sort(function(a, b){return a.jobPriority - b.jobPriority});
        }
    },
    actions:{
        nuxtServerInit(vuexContext,context){
            return this.$axios.get("/get-jobs").then(response => {
                vuexContext.commit("setJobs", response.data.docs)
            })
        },

        addJobs(vuexContext,job){
            this.$axios.post("/add-job",{job: job.jobName, priority: job.jobPriority}).then(response => {
                vuexContext.commit("addJobs",response.data.data)
            })
        },
        changePriority(vuexContext,priority) {
            this.$axios.put("/put-priority" , {priority: priority.priority, id: priority.id} ).then(response => {
                vuexContext.commit("updateJob",response.data.data)
            })
        },
        deleteJob(vuexContext,id) {
            this.$axios.post("/delete-job" , id ).then(response => {
                vuexContext.commit("deleteJob",response.data.data)
            })
        }
        

    },
    getters:{
        getJobs(state){
            return state.jobs
        }
    }
}