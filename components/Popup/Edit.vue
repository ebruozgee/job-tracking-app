<template>
  <div>
    <b-modal ref="modal-edit" id="modalEdit" hide-footer hide-header>
      <div class="">
        <b-form>
          <b-form-group label="Job Name:" label-for="input-1">
            <b-form-input
              id="input-1"
              type="text"
              :placeholder="this.job.jobName"
              readonly
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Job Priority:" label-for="input-2">
            <b-form-select
              id="input-2"
              v-model="form.jobPriority"
              :options="options"
            ></b-form-select>
          </b-form-group>
        </b-form>
        <div class="text-center">
          <b-button class="mr-2" @click="$bvModal.hide('modalEdit')"
            >Cancel</b-button
          >
          <b-button @click="changePriority" class="ml-2" variant="danger">Save</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ['job'],
  data() {
    return {
      form: {
        jobPriority: null,
      },
      options: [
        { value: null, text: 'Choose', disabled: true },
        { value: 0, text: 'Urgent' },
        { value: 1, text: 'Regular' },
        { value: 2, text: 'Trivial' },
      ],
    }
  },
  methods:{
      changePriority() {
          if(this.form.jobPriority !== null) {
              this.$store.dispatch("changePriority" ,{priority: this.form.jobPriority, id: this.job.id} )
              this.$refs['modal-edit'].hide()
          }
      }

  }
}
</script>

<style></style>
