<template>
  <v-container>
    <v-layout row v-if="getError">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="getError.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm4 offset-sm4>
        <v-card>
          <v-card-title primary>
            <div class="headline mb-0">Sign In</div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container fluid>
              <form @submit.prevent="onSignin" novalidate>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Email"
                      ref="email"
                      v-model="form.email"
                      type="email"
                      :error-messages="emailErrors"
                      @input="$v.form.email.$touch()"
                      @blur="$v.form.email.$touch()"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      ref="password"
                      v-model="form.password"
                      type="password"
                      :error-messages="passwordErrors"
                      @input="$v.form.password.$touch()"
                      @blur="$v.form.password.$touch()"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit" :disabled="getLoading" :loading="getLoading">
                      Sign in
                       <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, email, minLength } from 'vuelidate/lib/validators'
  import { mapGetters } from 'vuex'

  export default {
    name: 'signin',
    mixins: [validationMixin],
    validations: {
      form: {
        email: {
          required,
          email
        },
        password: {
          minLength: minLength(6),
          required
        }
      }
    },
    data () {
      return {
        form: {
          email: '',
          password: ''
        }
      }
    },
    computed: {
      ...mapGetters(['getUser', 'getLoading', 'getError']),
      emailErrors () {
        const errors = []
        if (!this.$v.form.email.$dirty) return errors
        !this.$v.form.email.email && errors.push('Must be valid e-mail.')
        !this.$v.form.email.required && errors.push('E-mail is required')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.form.password.$dirty) return errors
        !this.$v.form.password.minLength && errors.push('Password must have at least 6 letters.')
        !this.$v.form.password.required && errors.push('Password is required.')
        return errors
      }
    },
    watch: {
      getUser (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onSignin () {
        this.$store.dispatch('signUserIn', {email: this.form.email, password: this.form.password})
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>
