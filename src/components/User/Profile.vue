<template>
  <v-layout row justify-center wrap>
    <v-flex d-flex xs3>
      <v-layout row wrap>
        <v-flex d-flex xs4 text-xs-center align-center justify-center>
          <v-card flat tile>
            <!-- <v-card-title primary class="title">
              avatar
            </v-card-title> -->
            <v-card-text>
              <v-avatar
                size="128px"
                class="grey lighten-4">
                <img src="https://placehold.it/256x256" alt="avatar">
              </v-avatar>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex d-flex xs8>
          <v-card flat tile>
            <v-card-title primary class="title">
              profile desc
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex d-flex xs1 text-xs-center justify-center>
      <v-card class="green" dark>
        <v-card-title primary class="title">
          Followers
        </v-card-title>
      </v-card>
    </v-flex>
    <v-flex d-flex xs1>
      <v-card class="blue" dark>
        <v-card-title primary class="title">
          Followings
        </v-card-title>
      </v-card>
    </v-flex>
    <v-flex d-flex xs1>
      <v-card class="red" dark>
        <v-card-title primary class="title">
          Likes
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {

}
</script>

<style>

</style>

