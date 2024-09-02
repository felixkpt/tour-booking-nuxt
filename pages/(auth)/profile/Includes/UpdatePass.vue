<template>
    <div class="accordion" id="userAccordionPanels">
      <div class="accordion-item mt-3">
        <h2 class="accordion-header">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#userCollapsePass"
            aria-expanded="false"
            aria-controls="userCollapsePass"
            aria-labelledby="headingPass"
          >
            Password Update
          </button>
        </h2>
        <div
          id="userCollapsePass"
          class="accordion-collapse collapse"
        >
          <div class="accordion-body">
            <form
              method="post"
              :action="`/auth/update-password`"
              @submit.prevent="handleSubmit"
              class="flex justify-center"
            >
              <input type="hidden" name="_method" value="patch" />
              <div class="pl-lg-4">
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    name="current_password"
                    id="input-current-password"
                    class="form-control"
                    placeholder="Current Password"
                  />
                  <label class="form-label" for="input-current-password">
                    <i class="w3-xxlarge fa fa-eye-slash"></i>Current Password
                  </label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    name="password"
                    id="input-password"
                    class="form-control"
                    placeholder="New Password"
                  />
                  <label class="form-label" for="input-password">
                    <i class="w3-xxlarge fa fa-eye-slash"></i>New Password
                  </label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    name="password_confirmation"
                    id="input-password-confirmation"
                    class="form-control"
                    placeholder="Confirm New Password"
                  />
                  <label class="form-label" for="input-password-confirmation">
                    <i class="w3-xxlarge fa fa-eye-slash"></i>Confirm New Password
                  </label>
                </div>
                <div class="text-center">
                  <BaseComponentsButtonsSubmitButton class="btn btn-warning mt-4">
                    Change password
                  </BaseComponentsButtonsSubmitButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import { publish } from '~/components/BaseComponents/utils/pubSub';

  
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    publish('autoPost', e);
  };
  </script>
  