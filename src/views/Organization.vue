<template>
    <Header
        v-if="organization"
        greeting="Welcome to"
        :name="organization.name">
    </Header>
        
    <div class="container mt-2">
        <div class="row d-flex justify-content-center">
            <div class="col-md-12">

                <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">

                    <!-- role: student, org admin -->

                    <li class="nav-item"> 
                        <button class="nav-link active" id="faq_tab_4-tab"
                            data-bs-toggle="tab" data-bs-target="#eventTab" type="button" role="tab"
                            aria-controls="faq_tab_4" aria-selected="false">

                            <div class="d-flex flex-column lh-lg"> 
                                <i class="bi bi-calendar"></i>
                                <span>Events</span> 
                            </div>
                        </button> 
                    </li>
                    <!-- role: student, org admin -->



                    <!-- role: office admin, org admin -->
                    <li class="nav-item">
                        <button class="nav-link " id="faq_tab_1-tab" data-bs-toggle="tab"
                            data-bs-target="#memberTab" type="button" role="tab" aria-controls="faq_tab_1"
                            aria-selected="true">

                            <div class="d-flex flex-column lh-lg">
                                <i class="bi bi-person"></i>
                                <span>Members</span>
                            </div>
                        </button>
                    </li>
                    <!-- role: office admin, org admin -->

                </ul>

                <div class="tab-content" id="myTabContent">

                    <!-- role: student, org admin -->
                    <div class="tab-pane fade active show" id="eventTab" role="tabpanel" aria-labelledby="faq_tab_4-tab">
                        <div class="container p-3">

                            <!-- student no add event button -->
                            <div class = "row">
                                <div class = "col-md-8">
                                </div>
                                <div class="col-md-4">
                                    <button class="btn btn-success mb-2 p-2" style="width: 100%">
                                        <i class="bi bi-calendar p-1"></i>
                                        Add Event
                                    </button>
                                </div>
                            </div>
                            <!-- student no add event button -->
                            
                            <div class = "row">
                                <table class="table text-center table-bordered ">
                                    <thead class = "bg-success text-white">
                                        <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">Event Name</th>
                                            <th scope="col">Fines</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr class = "clickable-row" data-href='//'> <!-- link -->
                                            <th scope="row">5/3/2023</th>
                                            <td>Mass</td>
                                            <td>20</td>
                                        </tr>
                                        <tr class="clickable-row" data-href='//'> <!-- link -->
                                            <th scope="row">5/4/2023</th>
                                            <td>Meeting</td>
                                            <td>25</td>
                                        </tr>
                                        <tr class = "clickable-row" data-href='//'> <!-- link -->
                                            <th scope="row">5/5/2023</th>
                                            <td>Seminar</td>
                                            <td>50</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                    <!-- role: student, org admin -->


                    <!-- role: office admin, org admin -->
                    <div class="tab-pane fade" id="memberTab" role="tabpanel" aria-labelledby="faq_tab_1-tab">
                        <div class="container p-3">
                            <div class = "row">
                                <div class="col-md-8">
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Name / ID Number" id="searchUser" v-model="searchUser"> 
                                        <button class="btn btn-success mb-2 p-2">
                                            <i class="bi bi-search px-1"></i>
                                            Search
                                        </button>
                                    </div>
                                </div>
                            <!-- office admin no add member button -->
                                <div class = "col-md-4">
                                    <button class="btn btn-success mb-2 p-2" style="width: 100%">
                                        <i class="bi bi-person p-1"></i>
                                        Add Member
                                    </button>
                                </div>
                            </div>
                            <!-- office admin no add member button -->

                            <div class = "row">
                                <table class="table text-center table-bordered ">
                                    <thead class = "bg-success text-white">
                                        <tr>
                                            <th scope="col">ID Number</th>
                                            <th scope="col">Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class = "clickable-row" data-href='//'> <!-- link -->
                                            <th scope="row">00001</th>
                                            <td>Firstname Lastname</td>
                                        </tr>
                                        <tr class="clickable-row" data-href='//'> <!-- link -->
                                            <th scope="row">00002</th>
                                            <td>Firstname Lastname</td>
                                        </tr>
                                        <tr class = "clickable-row" data-href='//'> <!-- link -->
                                            <th scope="row">00003</th>
                                            <td>Firstname Lastname</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>
                    </div>
                    <!-- role: office admin, org admin -->
                </div>

            </div>
        </div>
    </div>  
</template>

<style>
    .nav-tabs .nav-link.active {
        border-color: transparent;
        background-color: #fff !important;
        color: #198754 !important;
        border-bottom: 4px solid #198754 !important
    }

    .nav-fill .nav-item .nav-link,
    .nav-justified .nav-item .nav-link {
        width: 100%;
        color: #000
    }

    .clickable-row { 
        cursor: pointer; 
    }
</style>

<!-- <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script> -->
<script setup>
    import { ref, computed, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import Header from '@/components/Header.vue'
    import { useAuthStore } from '@/stores/auth'
    import { useOrgStore } from '@/stores/org'
    import { useErrorsStore } from '@/stores/errors'

    const route = useRoute()
    const auth = useAuthStore()
    const org = useOrgStore()
    const errors = useErrorsStore()
    const searchUser = ref('')

    const organization = computed(() => {
        return org.orgData[route.params.orgId]
    })

    onMounted(async () => {
        if(!organization.value) {
            try {
                await org.loadOrg(route.params.orgId)
            } catch(e) {
                errors.add(`Cannot load org: ${e.message}`)
            }
        }
    })
</script>
