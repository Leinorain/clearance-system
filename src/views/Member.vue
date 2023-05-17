<template>
    <div class="container p-3">
        <div class = "row">
            <div class = "col-sm-12 align-items-center text-center">
                <img src="https://mdbootstrap.com/img/new/avatars/8.jpg" class="rounded-circle" alt="" style="width: 99px; height: 90px"/>
                <div class="">
                    <p class="fw-bold m-1 h3">STUDENT NOX</p>
                    <p class="text-muted mb-0 h6">0000X</p>
                </div>
            </div>
        </div>
        <div class ="row py-3">
            
            <div class="col-5 px-1">
                <div class="text-center border border-success border-2 rounded">
                    <p class="w-100 bg-success text-white fw-bold fs-3 mb-0">Fines</p>
                    <p class="w-100 border-success fs-4 mb-0">100</p>
                </div>
            </div>


            <div class="col-5 px-1">
                <div class="text-center border border-success border-2 rounded">
                    <p class="w-100 bg-success text-white fw-bold fs-3 mb-0">Status</p>
                    <p class="w-100 border-success mb-0 fs-4 text-danger">Unapproved</p>
                </div>
            </div>

            <div class="col-2 px-1">
                <button type="button" class="btn btn-success btn-lg">Issue Clearance</button>
            </div>
        </div>
        <div class = "row">
            <table class="table text-center table-bordered ">
                <thead class = "bg-success text-white">
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Event Name</th>
                        <th scope="col">Attendance</th>
                        <th scope="col">Fines</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>5/3/2023</td>
                        <td>Mass</td>
                        <td>Present</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>5/4/2023</td>
                        <td>Meeting</td>
                        <td>Present</td>
                        <td>25</td>
                    </tr>
                    <tr>
                        <td>5/5/2023</td>
                        <td>Seminar</td>
                        <td>Present</td>
                        <td>50</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
