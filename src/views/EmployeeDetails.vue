<template>
  <div class="container mt-5">
    <h1>Employee Details</h1>
    <div v-if="loading" class="text-center">
      <p>Loading employee details...</p>
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else-if="error" class="alert alert-danger" role="alert">
      Error: {{ error }}
    </div>
    <div v-else-if="employee">
      <div class="card">
        <div class="card-body" v-if="!isEditing">
          <h5 class="card-title">{{ employee.firstName }} {{ employee.lastName }}</h5>
          <p class="card-text"><strong>ID:</strong> {{ employee.id }}</p>
          <p class="card-text"><strong>Email:</strong> {{ employee.email }}</p>
          <p class="card-text"><strong>Phone:</strong> {{ employee.phone }}</p>
          <button class="btn btn-primary mt-3" @click="startEditing">Edit</button>
        </div>
        <div class="card-body" v-else>
          <h5 class="card-title">Edit Employee</h5>
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input type="text" class="form-control" id="firstName" v-model="editedEmployee.firstName" />
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input type="text" class="form-control" id="lastName" v-model="editedEmployee.lastName" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" v-model="editedEmployee.email" />
          </div>
          <div class="form-group">
            <label for="phone">Phone</label>
            <input type="text" class="form-control" id="phone" v-model="editedEmployee.phone" />
          </div>
          <div class="mt-3">
            <button class="btn btn-success" @click="saveChanges">Save</button>
            <button class="btn btn-secondary ml-2" @click="cancelEditing">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Employee not found.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'; 
import axios from 'axios';

export default {
  name: 'EmployeeDetails',
  setup() {
    const employee = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const route = useRoute();
    const router = useRouter(); 

    const isEditing = ref(false);
    const editedEmployee = ref({});

    onMounted(() => {
      const employeeId = route.params.id;

      axios.get(`https://localhost:7033/api/EmployeeAPI/${employeeId}`)
        .then(response => {
          if (response.data) {
            employee.value = response.data;
            editedEmployee.value = { ...response.data }; 
          } else {
            error.value = "Employee not found";
          }
          loading.value = false;
        })
        .catch(err => {
          error.value = err.message;
          loading.value = false;
        });
    });

    const startEditing = () => {
      isEditing.value = true;
    };

    const cancelEditing = () => {
      isEditing.value = false;
      editedEmployee.value = { ...employee.value }; 
    };

    const saveChanges = () => {
      const employeeId = route.params.id;
      axios
        .put(`https://localhost:7033/api/EmployeeAPI/${employeeId}`, editedEmployee.value)
        .then(() => {
          employee.value = { ...editedEmployee.value }; 
          isEditing.value = false;
          router.push(`/employees/${employeeId}`); 
        })
        .catch(err => {
          error.value = err.message;
          console.error("Error updating employee:", err);
        });
    };

    return {
      employee,
      loading,
      error,
      isEditing,
      editedEmployee,
      startEditing,
      cancelEditing,
      saveChanges,
    };
  },
};
</script>

<style scoped>

.card {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
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