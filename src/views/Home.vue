<template>
    <Header name="Firstname Lastname"></Header>
    <div class="container mt-2">
        <div class="row">
            <div class="col-sm-12 col-md-6">
                <OrgCard
                    name="Data Club"
                    thumbnail="https://mdbootstrap.com/img/new/avatars/8.jpg"
                    is-approved>
                </OrgCard>
            </div>
        </div>
    </div>
</template>
<script setup>
import Header from '@/components/Header.vue'
import OrgCard from '@/components/OrgCard.vue'
</script>
