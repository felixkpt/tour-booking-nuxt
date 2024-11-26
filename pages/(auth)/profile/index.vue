<template>
  <div>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
    <div class="mt-3">
      <div class="section-image">
        <div class="row">
          <div class="col-md-8 mb-4">
            <div class="card">
              <div class="card-body px-2">
                <BasicInfo
                  :user="authUser"
                  :imageUrl="imageUrl"
                  @update-image="updateImageUrl"
                />
                <hr class="my-4" />
                <UpdatePass />
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card card-user">
              <div class="card-header no-padding">
                <div class="card-image">
                  <img :src="defaultUserBackDrop" alt="..." />
                </div>
              </div>
              <div class="card-body">
                <div class="author">
                  <div
                    class="avatar-wrapper position-relative author-image border-gray"
                  >
                    <img
                      class="profile-pic rounded-circle"
                      :src="imageUrl"
                      alt="Profile pic"
                    />
                  </div>
                  <h5 class="card-title">{{ authUser?.name }}</h5>
                  <p class="card-description">...</p>
                </div>
                <p class="card-description text-center">
                  Hey there! this,
                  <br />
                  is how your profile looks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AuthUser :isRequired="true" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useAuthUser } from "~/composables/user";
import BasicInfo from "./Includes/BasicInfo.vue";
import UpdatePass from "./Includes/UpdatePass.vue";

const authUser = useAuthUser(); // Accessing the user state
const imageUrl = ref("users/default-user.png");
const defaultUserBackDrop = "@/assets/images/default_user_back_drop.png";

// Watch for user updates
watch(authUser, (newUser) => {
  if (newUser?.avatar) {
    imageUrl.value = newUser.avatar;
  }
});

// Method to update image URL
const updateImageUrl = (newImageUrl: string) => {
  imageUrl.value = newImageUrl;
};
</script>
