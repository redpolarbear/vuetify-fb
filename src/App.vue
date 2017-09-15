<template>
  <v-app toolbar>
    <v-navigation-drawer
      absolute
      light
      overflow
      persistent
      :mini-variant.sync="mini"
      v-model="sideNav"
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0" v-if="userIsAuthenticated">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <!-- getUser.photoURL -->
              <img :src="getUser.photoURL" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>
                <!-- getUser.displayName -->
                {{ getUser.displayName }}
              </v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="mini =! mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pa-0" dense>
        <v-divider></v-divider>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="userIsAuthenticated"
          @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Logout
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="indigo darken-4" dark fixed dense>
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer" exact>Air Library</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-toolbar-items> -->
        <v-btn flat>
          <v-icon class="mr-2">home</v-icon>
          Home
        </v-btn>
        <v-btn flat>
          <v-icon class="mr-2">toys</v-icon>
          Moments</v-btn>
        <v-btn flat>
          <v-icon class="mr-2">edit</v-icon>
          Records</v-btn>
        <v-btn flat to="/profile">
          Profile
        </v-btn>
        <v-btn v-if="!userIsAuthenticated" dark outline to="/signin">Log in</v-btn>
        <v-btn v-if="!userIsAuthenticated" primary to="/signup">Sign up</v-btn>
        <v-btn outline dark small v-if="userIsAuthenticated" @click="onLogout">Logout</v-btn>
      <!-- </v-toolbar-items> -->
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        sideNav: false,
        mini: false
      }
    },
    computed: {
      ...mapGetters(['getUser']),
      menuItems () {
        let menuItems = [
          {icon: 'face', title: 'Sign up', link: '/signup'},
          {icon: 'lock_open', title: 'Sign in', link: '/signin'}
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            {icon: 'person', title: 'Profile', link: '/profile'}
          ]
        }
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>
