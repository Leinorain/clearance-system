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
        <div class = "row h-100 justify-content-center align-items-center py-3">
            
            <div class = "col-6 d-flex flex-column smallPadding">
                <div class="form-group text-center">
                    <label class = "form-control bg-success">
                        <p class = "text-white h5 studentModalTextHeader">
                            Fines
                        </p>
                    </label>
                    <input type="text" class="form-control text-center border-success studentModalTextBody" value="100" disabled>
                </div>
            </div>
            
            <div class = "col-6 d-flex flex-column smallPadding">
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
</template>
