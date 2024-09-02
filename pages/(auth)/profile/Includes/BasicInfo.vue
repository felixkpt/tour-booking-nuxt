<template>
  <div class="accordion" id="userAccordionPanels">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#userCollapseBasicInfo"
          aria-expanded="true"
          aria-controls="userCollapseBasicInfo"
          aria-labelledby="headingBasicInfo"
        >
          Basic info
        </button>
      </h2>
      <div id="userCollapseBasicInfo" class="accordion-collapse collapse show">
        <div class="accordion-body">
          <div v-if="user">
            <form
              id="profile-update"
              method="post"
              :action="`/auth/profile`"
              @submit.prevent="handleSubmit"
              enctype="multipart/form-data"
              class="flex justify-center"
            >
              <input type="hidden" name="_method" value="patch" />
              <div class="pl-lg-4">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    name="name"
                    id="input-name"
                    class="form-control"
                    placeholder="Name"
                    v-model="form.name"
                  />
                  <label class="form-label" for="input-name">
                    <i class="w3-xxlarge fa fa-user"></i>Name
                  </label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    name="email"
                    id="input-email"
                    class="form-control"
                    placeholder="Email"
                    v-model="form.email"
                  />
                  <label class="form-label" for="input-email">
                    <i class="w3-xxlarge fa fa-envelope-o"></i>Email
                  </label>
                </div>
                <div class="form-floating mb-3">
                  <div>
                    <div
                      class="avatar-wrapper position-relative"
                      title="Click to upload new picture"
                      @click="triggerFileInput"
                    >
                      <img
                        class="profile-pic rounded-circle"
                        :src="imageUrl"
                        alt="Profile pic"
                      />
                      <div class="upload-button p-1">
                        <div
                          class="position-absolute top-50 start-50 translate-middle arrow-circle-up"
                        >
                          <Icon icon="simple-line-icons:info" />
                        </div>
                      </div>
                      <input
                        id="avatarUpload"
                        type="file"
                        name="avatar"
                        @change="handleImageChange"
                        accept="image/*"
                        style="display: none"
                      />
                    </div>
                  </div>
                </div>
                <div class="text-center">
                  <BaseComponentsButtonsSubmitButton
                    class="btn btn-warning mt-4"
                    >Save</BaseComponentsButtonsSubmitButton
                  >
                </div>
              </div>
            </form>
          </div>
          <div v-else>Loading...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { publish } from "~/components/BaseComponents/utils/pubSub";

interface Props {
  user: any;
  imageUrl: string;
  setImageUrl: (url: string) => void;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (event: "update:image", url: string): void;
}>();


const form = ref({
  name: props.user?.name || "",
  email: props.user?.email || "",
});

const imageUrl = computed(() => props.imageUrl);

const handleImageChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    const imageSrc = URL.createObjectURL(file);
    props.setImageUrl(imageSrc);
    emit("update:image", imageSrc);
  }
};

const triggerFileInput = () => {
  (document.getElementById("avatarUpload") as HTMLInputElement)?.click();
};

const handleSubmit = (e: Event) => {
  e.preventDefault();
  publish("autoPost", e);
};
</script>
