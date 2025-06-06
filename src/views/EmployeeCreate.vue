<template>
  <div class="container form-container">
    <h1>Register Employee</h1>
    <form @submit.prevent="createEmployee">
      <div class="mb-3">
        <label for="firstName" class="form-label">First Name</label>
        <input type="text" class="form-control" id="firstName" v-model="employee.firstName" required />
      </div>
      <div class="mb-3">
        <label for="lastName" class="form-label">Last Name</label>
        <input type="text" class="form-control" id="lastName" v-model="employee.lastName" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" v-model="employee.email" required />
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Phone</label>
        <input type="text" class="form-control" id="phone" v-model="employee.phone" required />
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
      <button type="button" class="btn btn-secondary" @click="cancel">Cancel</button>
    </form>
    <div v-if="error" class="alert alert-danger mt-3">
      Error: {{ error }}
    </div>
    <div v-if="loading" class="spinner-border text-primary mt-3" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: 'CreateEmployee',
  setup() {
    const employee = ref({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    });
    const loading = ref(false);
    const error = ref(null);
    const router = useRouter();

    const createEmployee = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await axios.post('https://localhost:7033/api/EmployeeAPI', employee.value);
        if (response.status === 201) {
          alert('Employee created successfully!');
          router.push({ name: 'employees' });
        } else {
          error.value = `Failed to create employee. Status code: ${response.status}`;
          loading.value = false;
        }

      } catch (err) {
        error.value = err.message || 'An error occurred while creating the employee.';
        loading.value = false;
      }
    };

    const cancel = () => {
      router.push({ name: 'employees' });
    };

    return {
      employee,
      loading,
      error,
      createEmployee,
      cancel,
      router
    };
  },
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px; 
  border: 1px solid #ddd; 
  border-radius: 8px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  background-color: white; 
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
