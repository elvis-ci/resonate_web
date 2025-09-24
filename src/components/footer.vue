<script>
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  LinkedinIcon,
  MailIcon,
} from "vue-feather-icons";
export default {
  data() {
    return {};
  },
  components: {
    FacebookIcon,
    InstagramIcon,
    TwitterIcon,
    LinkedinIcon,
    MailIcon,
  },
};
</script>

<template>
  <div>
    <!-- Footer Start -->
    <div class="position-relative">
      <div class="shape overflow-hidden text-footer">
        <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
        </svg>
      </div>
    </div>

    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-12 mb-0 mb-md-4 pb-0 pb-md-2">
            <a href="#" class="logo-footer">
              <img src="images/logo-light.png" height="24" alt="" />
            </a>
            <p class="mt-4">
              Start working with Landrick that can provide everything you need
              to generate awareness, drive traffic, connect.
            </p>
            <ul class="list-unstyled social-icon social mb-0 mt-4">
              <li class="list-inline-item">
                <a href="javascript:void(0)" class="rounded">
                  <facebook-icon class="fea icon-sm fea-social"></facebook-icon>
                </a>
              </li>
              <li class="list-inline-item ml-1">
                <a href="javascript:void(0)" class="rounded">
                  <instagram-icon
                    class="fea icon-sm fea-social"
                  ></instagram-icon>
                </a>
              </li>
              <li class="list-inline-item ml-1">
                <a href="javascript:void(0)" class="rounded">
                  <twitter-icon class="fea icon-sm fea-social"></twitter-icon>
                </a>
              </li>
              <li class="list-inline-item ml-1">
                <a href="javascript:void(0)" class="rounded">
                  <linkedin-icon class="fea icon-sm fea-social"></linkedin-icon>
                </a>
              </li>
            </ul>
            <!--end icon-->
          </div>
          <!--end col-->

          <div class="col-lg-2 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
            <h5 class="text-light footer-head">Company</h5>
            <ul class="list-unstyled footer-list mt-4">
              <li>
                <router-link to="/Home" class="text-foot"
                  ><i class="mdi mdi-chevron-right mr-1"></i> Home</router-link
                >
              </li>
              <li>
                <router-link to="/About-Us" class="text-foot"
                  ><i class="mdi mdi-chevron-right mr-1"></i> About
                  us</router-link
                >
              </li>
              <li>
                <router-link to="/Workspaces" class="text-foot"
                  ><i class="mdi mdi-chevron-right mr-1"></i>
                  Workspaces</router-link
                >
              </li>
              <li>
                <router-link to="/Community" class="text-foot"
                  ><i class="mdi mdi-chevron-right mr-1"></i>Community</router-link
                >
              </li>
              <li>
                <router-link to="/Contact" class="text-foot"
                  ><i class="mdi mdi-chevron-right mr-1"></i>
                  Contact</router-link
                >
              </li>
              <li>
                <router-link to="/Blog" class="text-foot"
                ><i class="mdi mdi-chevron-right mr-1"></i>
                Blog</router-link
                >
              </li>
              <li>
                <router-link to="/Sign-in" class="text-foot"
                  ><i class="mdi mdi-chevron-right mr-1"></i>
                  Sign in</router-link
                >
              </li>
            </ul>
          </div>
          <!--end col-->

          <div class="col-lg-3 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
            <h5 class="text-light footer-head">Usefull Links</h5>
            <ul class="list-unstyled footer-list mt-4">
              <li>
                <router-link to="/Terms" class="text-foot"
                  ><i class="mdi mdi-chevron-right mr-1"></i> Terms of
                  Services</router-link
                >
              </li>
              <li>
                <router-link to="/Privacy-Policy" class="text-foot"
                  ><i class="mdi mdi-chevron-right mr-1"></i> Privacy
                  Policy</router-link
                >
              </li>
              <li>
                <router-link to="/Booking" class="text-foot"
                  ><i class="mdi mdi-chevron-right mr-1"></i> Booking</router-link
                >
              </li>
            </ul>
          </div>
          <!--end col-->

          <div class="col-lg-3 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
            <h5 class="text-light footer-head">Newsletter</h5>
            <p class="mt-4">Sign up and receive the latest tips via email.</p>
            <form>
              <div class="row">
                <div class="col-lg-12">
                  <div class="foot-subscribe form-group">
                    <label
                      >Write your email
                      <span class="text-danger">*</span></label
                    >
                    <div class="position-relative">
                      <mail-icon class="fea icon-sm icons"></mail-icon>
                      <input
                        type="email"
                        name="email"
                        id="emailsubscribe"
                        class="form-control pl-5 rounded"
                        placeholder="Your email : "
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="col-lg-12">
                  <input
                    type="submit"
                    id="submitsubscribe"
                    name="send"
                    class="btn btn-soft-primary btn-block"
                    value="Subscribe"
                  />
                </div>
              </div>
            </form>
          </div>
          <!--end col-->
        </div>
        <!--end row-->
      </div>
      <!--end container-->
    </footer>
    <!--end footer-->
    <footer class="footer footer-bar">
      <div class="container text-center">
        <div class="row align-items-center justify-content-center">
          <div class="col-sm-6">
            <div class="text-sm-left text-center ">
              <p class="mb-0 mx-auto">
                © 2025 - {{ new Date().getFullYear() }} Resonate. All Rights Reserved.
              </p>
            </div>
          </div>
          <!--end col-->

        </div>
        <!--end row-->
      </div>
      <!--end container-->
    </footer>
    <!--end footer-->
  </div>
</template>
