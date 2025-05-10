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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.id">
            <td>{{ employee.id }}</td>
            <td>{{ employee.firstName }}</td>
            <td>{{ employee.lastName }}</td>
            <td>{{ employee.email }}</td>
            <td>{{ employee.phone }}</td>
            <td>
              <div class="btn-group" role="group">
                <button @click="viewEmployee(employee.id)" class="btn btn-sm btn-primary">View</button>
                <button @click="editEmployee(employee.id)" class="btn btn-sm btn-secondary">Edit</button>
                <button @click="deleteEmployee(employee.id)" class="btn btn-sm btn-danger">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="employees.length === 0">No employees found.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter
import axios from 'axios';

export default {
  name: 'EmployeeListView',
  setup() {
    const employees = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const router = useRouter(); // Initialize router

    onMounted(() => {
      // Use the provided API endpoint
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

    const viewEmployee = (id) => {
      // Use router.push to navigate to the view route.
      router.push({ name: 'EmployeeDetails', params: { id: id } }); // Adjust 'employee-details' to your actual route name
    };

    const editEmployee = (id) => {
      router.push({ name: 'EmployeeDetails', params: { id: id }});
    }

    const deleteEmployee = (id) => {
      // In a real application, you'd show a confirmation dialog here.
      if (confirm(`Are you sure you want to delete employee with ID ${id}?`)) {
        axios.delete(`https://localhost:7033/api/EmployeeAPI/${id}`) // Corrected delete URL.
          .then(() => {
            // Remove the deleted employee from the list.
            employees.value = employees.value.filter(employee => employee.id !== id);
            alert('Employee deleted successfully!'); //optional
          })
          .catch(err => {
            error.value = err.message;
            alert('Failed to delete employee!'); //optional
          });
      }
    };

    return {
      employees,
      loading,
      error,
      viewEmployee,
      editEmployee,
      deleteEmployee,
      router // Make sure to return the router instance if you need it in the template
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>