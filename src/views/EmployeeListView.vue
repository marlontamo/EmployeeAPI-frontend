<template>
  <div class="container mt-5">
    <h1>Employees List</h1>
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
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: 'EmployeeListView',
  setup() {
    const employees = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const router = useRouter();

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

    const viewEmployee = (id) => {
      router.push({ name: 'EmployeeDetails', params: { id: id } });
    };

    const editEmployee = (id) => {
      router.push({ name: 'EmployeeDetails', params: { id: id }});
    }

    const deleteEmployee = (id) => {
      if (confirm(`Are you sure you want to delete employee with ID ${id}?`)) {
        axios.delete(`https://localhost:7033/api/EmployeeAPI/${id}`) 
          .then(() => {
            
            employees.value = employees.value.filter(employee => employee.id !== id);
            alert('Employee deleted successfully!'); 
          })
          .catch(err => {
            error.value = err.message;
            alert('Failed to delete employee!'); 
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
      router 
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
.spinner-border {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border: 0.25rem solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
  border-width: 0.2rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}


.spinner-border-primary {
  color: #007bff;
}
</style>