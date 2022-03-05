<template>
      <b-row>
          <b-col sm="8" md="8">
  <b-form-group label="Job Name:" label-for="input-1">
      <b-form-input
        id="input-1"
        v-model="$v.form.jobName.$model"
        type="text"
        placeholder="Job Name"
              :state="validateState('jobName')"
      ></b-form-input>
    </b-form-group>
          </b-col>
          <b-col sm="2" md="2">
   <b-form-group label="Job Priority:" label-for="input-2">
      <b-form-select
        id="input-2"
        v-model="$v.form.jobPriority.$model"
        :options="options"
                      :state="validateState('jobPriority')"

      ></b-form-select>
    </b-form-group>
          </b-col>
          <b-col class="mt-3" sm="2" md="2">
    <b-button @click="onSubmit()" class="mt-3" variant="primary" block> <b-icon icon="plus"></b-icon> Create</b-button>
          </b-col>
      </b-row>
  

 
</template>

<script>
import { validationMixin } from "vuelidate";
import { required , maxLength} from "vuelidate/lib/validators";
export default {
      mixins: [validationMixin],
  data() {
    return {
      form: {
        jobName: '',
        jobPriority: null,
      },
      options: [
        { value: null, text: 'Choose', disabled: true },
        { value:0, text: 'Urgent' },
        { value: 1, text: 'Regular' },
        { value: 2, text: 'Trivial' },
      ],
    }
  },
  validations: {
    form: {
      jobName: {
        required,
           maxLength: maxLength(255),
      },
      jobPriority: {
        required,
      },
    },
  },
  methods:{
      validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
      onSubmit(){
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
            return;
        }
          this.$store.dispatch("addJobs",this.form)
      }
  }
}
</script>

<style></style>
