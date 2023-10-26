<template>
  <v-app>
    <v-layout>
      <v-app-bar density="compact" elevation="1">
        <v-app-bar-title>
          <nuxt-link to="/">
            TILDI Assignment
          </nuxt-link>
        </v-app-bar-title>
      </v-app-bar>
      <v-main>
        <v-container>
          <div class="max-w-screen-md mx-auto">
            <NuxtPage />
          </div>
        </v-container>
      </v-main>
      <!-- <v-bottom-navigation>
        <v-btn value="upload" to="/">
          <v-icon>mdi-upload</v-icon>
          
          <span>Upload</span>
        </v-btn>

        <v-btn value="history" to="/history">
          <v-icon>mdi-history</v-icon>

          <span>History</span>
        </v-btn>
      </v-bottom-navigation> -->
    </v-layout>
  </v-app>
</template>