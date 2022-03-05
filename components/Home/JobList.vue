<template>
  <div>
    <div>
      <b-form>
        <b-row>
          <b-col sm="8" md="8">
            <b-form-group label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="form.jobName"
                type="text"
                placeholder="Job Name"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="4" md="4">
            <b-form-group label-for="input-2">
              <b-form-select
                id="input-2"
                v-model="form.jobPriority"
                :options="options"
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Priority</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filterJobs" :key="item.id">
          <td>{{ item.job }}</td>
          <td>
            <h5>
              <b-badge class="text-white" :variant="item.variant">{{
                item.priority
              }}</b-badge>
            </h5>
          </td>
          <td>
            <div class="d-flex flex-row">
              <b-button
                v-b-modal.modalEdit
                size="sm"
                @click="jobAdd(item.id, item.job, item.priority)"
                variant="info"
              >
                <b-icon icon="pencil"></b-icon>
              </b-button>
              <b-button
                size="sm"
                variant="info"
                v-b-modal.modalDelete
                class="ml-2"
                @click="jobAdd(item.id, item.job, item.priority)"
              >
                <b-icon icon="trash"></b-icon
              ></b-button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <PopupDelete :job="job" />
    <PopupEdit :job="job" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        jobName: '',
        jobPriority: null,
      },
      options: [
        { value: null, text: 'Priority (All)', disabled: true },
        { value: 'Urgent', text: 'Urgent' },
        { value: 'Regular', text: 'Regular' },
        { value: 'Trivial', text: 'Trivial' },
      ],
      job: {
        id: '',
        jobName: '',
        jobPriority: null,
      },
    }
  },
  computed: {
  
    Jobs() {
      var jobs = []
      this.$store.getters.getJobs.forEach((item) => {
        if (item.jobPriority == 0) {
          jobs.push({
            id: item._id,
            job: item.jobsName,
            priority: 'Urgent',
            variant: 'danger',
          })
        }
        if (item.jobPriority == 1) {
          jobs.push({
            id: item._id,
            job: item.jobsName,
            priority: 'Regular',
            variant: 'warning',
          })
        }
        if (item.jobPriority == 2) {
          jobs.push({
            id: item._id,
            job: item.jobsName,
            priority: 'Trival',
            variant: 'primary',
          })
        }
      })

      return jobs
    },

    filterJobs(){
      return this.Jobs.filter((job) =>{
        return job.job.match(this.form.jobName)
      } )
    }
  },
  methods: {
    jobAdd(id, job, priority) {
      this.job.id = id
      this.job.jobName = job
      this.job.jobPriority = priority
    },
  },
}
</script>

<style></style>
