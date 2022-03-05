<template>
  <div>
    <b-modal ref="modal-delete" id="modalDelete" hide-footer hide-header>
      <div class="text-center">
        <b-icon
          icon="exclamation-circle"
          class="h1 mb-2"
          variant="danger"
        ></b-icon>
        <p class="my-2">Are you sure you want to delete it?</p>

        <b-button class="mr-2" @click="$bvModal.hide('modalDelete')"
          >Cancel</b-button
        >
        <b-button class="ml-2" @click="deleteJob" variant="danger"
          >Approve</b-button
        >
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ['job'],
  methods: {
    deleteJob() {
      this.$store.dispatch('deleteJob', { id: this.job.id })
      this.$refs['modal-delete'].hide()
    },
  },
}
</script>

<style></style>
