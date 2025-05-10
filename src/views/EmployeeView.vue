<template>
  <div class="container mt-5">
    <h1>Employees</h1>
    <div v-if="loading" class="text-center">
      <p>Loading employees...</p>
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else-if="error" class="alert alert-danger" role="alert">
      Error: {{ error }}
    </div>
    <div v-else>
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.id">
            <td>{{ employee.id }}</td>
            <td>{{ employee.firstName }}</td>
            <td>{{ employee.lastName }}</td>
            <td>{{ employee.email }}</td>
            <td>{{ employee.phone }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="employees.length === 0">No employees found.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios'; 
export default {
  name: 'EmployeeView',
  setup() {
    const employees = ref([]);
    const loading = ref(true);
    const error = ref(null);

    onMounted(() => {
      
      axios.get('https://localhost:7033/api/EmployeeAPI')
        .then(response => {
          employees.value = response.data;
          loading.value = false;
        })
        .catch(err => {
          error.value = err.message;
          loading.value = false;
        });
    });

    return {
      employees,
      loading,
      error
    };
  }
};
</script>

<style scoped>

.container {
  max-width: 800px; 
}
</style>
