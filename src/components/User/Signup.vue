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
          <v-card-title>
            <div class="headline mb-0">Sign Up</div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup" novalidate>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      label="Name"
                      v-model="form.name"
                      name="name"
                      ref="name"
                      :error-messages="nameErrors"
                      :counter="15"
                      @input="$v.form.name.$touch()"
                      @blur="$v.form.name.$touch()"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
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
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      ref="confirmPassword"
                      v-model="form.confirmPassword"
                      type="password"
                      :error-messages="confirmPasswordErrors"
                      @input="$v.form.confirmPassword.$touch()"
                      @blur="$v.form.confirmPassword.$touch()"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit" :disabled="getLoading" :loading="getLoading">
                      Sign up
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
  import shortid from 'shortid'
  import md5 from 'md5'
  import { required, maxLength, email, minLength, sameAs } from 'vuelidate/lib/validators'
  import { mapGetters } from 'vuex'

  export default {
    name: 'signup',
    mixins: [validationMixin],
    validations: {
      form: {
        name: {
          required,
          maxLength: maxLength(15)
        },
        email: {
          required,
          email
        },
        password: {
          minLength: minLength(6),
          required
        },
        confirmPassword: {
          sameAsPassword: sameAs('password'),
          required
        }
      }
    },
    data () {
      return {
        form: {
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        }
      }
    },
    computed: {
      ...mapGetters(['getUser', 'getLoading', 'getError']),
      nameErrors () {
        const errors = []
        if (!this.$v.form.name.$dirty) return errors
        !this.$v.form.name.maxLength && errors.push('Name must be at most 15 characters long.')
        !this.$v.form.name.required && errors.push('Name is required.')
        return errors
      },
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
      },
      confirmPasswordErrors () {
        const errors = []
        if (!this.$v.form.confirmPassword.$dirty) return errors
        !this.$v.form.confirmPassword.sameAsPassword && errors.push('Passwords do not match!')
        !this.$v.form.confirmPassword.required && errors.push('Confirm Password is required.')
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
      onSignup () {
        const defaultUserProfile = {
          _id: shortid.generate(),
          displayName: this.form.name,
          email: this.form.email,
          password: this.form.password,
          photoURL: `https://www.gravatar.com/avatar/${md5((this.form.email.trim()).toLowerCase())}?d=mm&s=200`,
          location: null,
          about: null
        }
        this.$store.dispatch('signUserUp', defaultUserProfile)
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>
