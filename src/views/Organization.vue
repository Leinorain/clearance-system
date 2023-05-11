<template>
    <Header :name="auth.userDisplayName"></Header>
        
    <div class="container mt-2">
        <div class="row d-flex justify-content-center">
            <div class="col-md-12">

                <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">

                    <li class="nav-item">
                        <button class="nav-link active" id="faq_tab_1-tab" data-bs-toggle="tab"
                            data-bs-target="#memberTab" type="button" role="tab" aria-controls="faq_tab_1"
                            aria-selected="true">

                            <div class="d-flex flex-column lh-lg">
                                <i class="bi bi-person"></i>
                                <span>Members</span>
                            </div>
                        </button>
                    </li>

                    <li class="nav-item"> 
                        <button class="nav-link" id="faq_tab_4-tab"
                            data-bs-toggle="tab" data-bs-target="#eventTab" type="button" role="tab"
                            aria-controls="faq_tab_4" aria-selected="false">

                            <div class="d-flex flex-column lh-lg"> 
                                <i class="bi bi-calendar"></i>
                                <span>Events</span> 
                            </div>
                        </button> 
                    </li>

                </ul>

                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade active show" id="memberTab" role="tabpanel" aria-labelledby="faq_tab_1-tab">
                        <div class="container p-3">
                            <div class = "row">
                                <div class = "col-md-4">
                                    <button class="btn btn-success mb-2 p-2" style="width: 100%">
                                        <i class="bi bi-person p-1"></i>
                                        Add Member
                                    </button>
                                </div>
                                <div class="col-md-8">
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control p-2" placeholder="Name / ID Number" id="searchUser" v-model="searchUser"> 
                                        <button class="btn btn-success p-2">
                                            <i class="bi bi-search p-1"></i>
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class = "row">
                                <!-- Orgs-->
                                <div class="col-lg-6">
                                    <div class="card btn" data-bs-toggle="modal" href = "#viewMemberModal" >
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="d-flex align-items-center">
                                                    <img src="https://mdbootstrap.com/img/new/avatars/8.jpg" alt="" style="width: 45px; height: 45px" class="rounded-circle card-image-center"/>
                                                    <div class="ms-3 card-text">
                                                        <p class="fw-bold mb-1">STUDENT NO1</p>
                                                        <p class="text-muted mb-0">00001</p>
                                                    </div>
                                                </div>
                                                <span v-if="isApproved" class="badge rounded-pill text-bg-success">Approved</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
        
                                <div class="col-lg-6">
                                    <div class="card btn" data-bs-toggle="modal" href = "#viewMemberModal">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="d-flex align-items-center">
                                                    <img src="https://mdbootstrap.com/img/new/avatars/6.jpg" alt="" style="width: 45px; height: 45px" class="rounded-circle card-image-center org-img"/>
                                                    <div class="ms-3 card-text">
                                                        <p class="fw-bold mb-1">STUDENT NO2</p>
                                                        <p class="text-muted mb-0">00002</p>
                                                    </div>
                                                </div>
                                                <span v-if="isApproved" class="badge rounded-pill text-bg-success">Approved</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
        
                                <div class="col-lg-6">
                                    <div class="card btn" data-bs-toggle="modal" href = "#viewMemberModal" >
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="d-flex align-items-center">
                                                    <img src="https://mdbootstrap.com/img/new/avatars/5.jpg" alt="" style="width: 45px; height: 45px" class="rounded-circle card-image-center"/>
                                                    <div class="ms-3 card-text">
                                                        <p class="fw-bold mb-1">STUDENT NO3</p>
                                                        <p class="text-muted mb-0">00003</p>
                                                    </div>
                                                </div>
                                                <span v-if="isApproved" class="badge rounded-pill text-bg-success">Approved</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
        
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="eventTab" role="tabpanel" aria-labelledby="faq_tab_4-tab">
                        <div class="container p-3">
                            <div class = "row pb-4">
                                <div class = "col-md-8">
                                </div>
                                <div class="col-md-4">
                                    <button class="btn btn-success mb-2 p-2" style="width: 100%">
                                        <i class="bi bi-calendar p-1"></i>
                                        Add Event
                                    </button>
                                </div>
                            </div>
                            
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
                                        <tr class="clickable-row bg-danger text-white" data-href='//'> <!-- link -->
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
                </div>

            </div>
        </div>
    </div>  
    



    <div class="modal fade" id="viewMemberModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
            <div class="modal-content align-items-center">
                <div class = "modal-header">

                </div>
                    <div class = "container justify-content-center align-items-center h-100">
                        <div class = "row">
                            <div class = "col-sm-12 align-items-center text-center">
                                <img src="https://mdbootstrap.com/img/new/avatars/8.jpg" class="rounded-circle" alt="" style="width: 99px; height: 90px"/>
                                <div class="">
                                    <p class="fw-bold m-1 h3">STUDENT NOX</p>
                                    <p class="text-muted mb-0 h6">0000X</p>
                                </div>
                            </div>
                        </div>
                        <div class = "row h-100 justify-content-center align-items-center py-3">

                            <div class = "col-4 d-flex flex-column smallPadding">
                                <div class="form-group text-center">
                                    <label class = "form-control bg-success">
                                        <p class = "text-white h5 studentModalTextHeader">
                                            Total Fines
                                        </p>
                                    </label>
                                    <input type="text" class="form-control text-center border-success studentModalTextBody" value="100" disabled>
                                </div>
                            </div>
                            
                            <div class = "col-4 d-flex flex-column smallPadding">
                                <div class="form-group text-center">
                                    <label class = "form-control bg-success">
                                        <p class = "text-white h5 studentModalTextHeader">
                                            Balance
                                        </p>
                                    </label>
                                    <input type="text" class="form-control text-center border-success studentModalTextBody" value="100" disabled>
                                </div>
                            </div>
                            
                            <div class = "col-4 d-flex flex-column smallPadding">
                                <div class="form-group text-center">
                                    <label class = "form-control bg-success">
                                        <p class = "text-white h5 studentModalTextHeader">
                                            Status
                                        </p>
                                    </label>
                                    <input type="text" class="form-control text-center text-danger border-success studentModalTextBody" value="Unapproved" disabled>
                                </div>
                            </div>

                        </div>
                        <div class = "row">
                            <div class = "col-12">
                                <p class ="text-center h4">
                                    Attendance Record
                                </p>
                            </div>
                        </div>
                        <div class = "row px-3">
                            <table class="table text-center table-bordered">
                                <thead class = "bg-success text-white">
                                    <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Event Name</th>
                                    <th scope="col">Fines</th>
                                    <th scope="col">Attendance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <th scope="row">5/3/2023</th>
                                    <td>Mass</td>
                                    <td>20</td>
                                    <td>Present</td>
                                    </tr>
                                    <tr class="bg-danger text-white">
                                    <th scope="row">5/4/2023</th>
                                    <td>Meeting</td>
                                    <td>25</td>
                                    <td>Absent</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">5/5/2023</th>
                                    <td>Seminar</td>
                                    <td>50</td>
                                    <td>Present</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                <div class = "modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <i class="bi bi-x"></i>
                        Close
                    </button>
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

    @media (max-width: 576px) {
            .studentModalTextHeader {
            font-size: 4vw !important;
        }
        .studentModalTextBody{
            font-size: 3vw !important;
        }
            .smallPadding{
            padding-left: 1vw;
            padding-right: 1vw;
            }
    }
</style>

<script setup>
    import { ref } from 'vue'
    import { computed } from 'vue'

    import Header from '@/components/Header.vue'
    import { useAuthStore } from '@/stores/auth'

    const props = defineProps({
    id: String,
    data: Object,
    isLoading: Boolean
    })

    const auth = useAuthStore()
    const searchUser = ref('')

    const isApproved = computed(() => true)
    
    // jQuery(document).ready(function ($) {
    //     $(".clickable-row").click(function () {
    //         window.location = $(this).data("href");
    //     });
    // });
        
</script>