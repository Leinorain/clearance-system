<template>
    <Header name="Firstname Lastname"></Header>
    <div class="container mt-2">
        <div class="row g-2">
            <div
                v-for="org in orgs"
                :id="org.id"
                class="col-sm-12 col-md-6">
                <OrgCard
                    :id="org.id"
                    :name="org.name"
                    :thumbnail="org.thumbnail"
                    is-approved>
                </OrgCard>
            </div>
        </div>
    </div>
</template>
<script setup>
import Header from '@/components/Header.vue'
import OrgCard from '@/components/OrgCard.vue'
import orgs from '@/data/student-orgs'
</script>
