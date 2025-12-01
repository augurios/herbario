<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTheme } from 'vuetify';
import { DotsVerticalIcon } from 'vue-tabler-icons';
import plantasData from '@/plantas.json';

const items = ref([
    { title: "Action" },
    { title: "Another action" },
    { title: "Something else here" },
]);

// Extract all unique uses from plantas.json
const allUses = computed(() => {
    const usesSet = new Set<string>();
    plantasData.forEach((planta: any) => {
        if (planta.uses && Array.isArray(planta.uses)) {
            planta.uses.forEach((use: string) => usesSet.add(use));
        }
    });
    return Array.from(usesSet).sort();
});

const selectedUse = ref<string | null>(null);

const selectUse = (use: string) => {
    if (selectedUse.value === use) {
        selectedUse.value = null; // Deselect if clicking the same button
    } else {
        selectedUse.value = use;
    }
};

// Filter plants based on selected use
const filteredPlantas = computed(() => {
    if (!selectedUse.value) {
        return plantasData; // Show all plants if no use is selected
    }
    return plantasData.filter((planta: any) => {
        return planta.uses && planta.uses.includes(selectedUse.value);
    });
});

const theme = useTheme();
const primary = theme.current.value.colors.primary;
const error = theme.current.value.colors.error;
const chartOptions = computed(() => {
    return {

        series: [
            {
                name: "Pixel ",
                data: [9, 5, 3, 7, 5, 10, 3],
            },
            {
                name: "Ample ",
                data: [6, 3, 9, 5, 4, 6, 4],
            },
        ],
        chartOptions: {
            grid: {
                borderColor: 'rgba(0,0,0,0.1)',
                strokeDashArray: 3,
                xaxis: {
                    lines: {
                        show: false
                    }
                },
                
            },
            plotOptions: {
                bar: { horizontal: false, columnWidth: "35%", borderRadius: [8] },
            },
            colors: [primary, error],
            chart: {
                fontFamily: 'inherit',
                type: "bar",
                height: 360,
                offsetY: 10,
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 5,
                colors: ["transparent"],
            },
            xaxis: {
                type: "category",
                categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    style: {
                        colors: "#a1aab2",
                    },
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#a1aab2",
                    },
                },
            },
            fill: {
                opacity: 1,
                colors: [primary, error],
            },
            tooltip: {
                theme: "dark",
            },
            legend: {
                show: false,
            },
            responsive: [
                {
                    breakpoint: 767,
                    options: {
                        stroke: {
                            show: false,
                            width: 5,
                            colors: ["transparent"],
                        },
                    },
                },
            ],

        },
    };
});
</script>
<template>
    <v-card elevation="10">
        <v-card-item>
            <div class="d-flex align-center justify-space-between">
                <div>
                    <h5 class="text-h5 mb-1 font-weight-semibold">Bienvenid@s a Herbario</h5>
                </div>
                <!-- <div>
                    <v-menu bottom left>
                        <template v-slot:activator="{ props }">
                            <v-btn icon color="inherit" v-bind="props" flat>
                                <DotsVerticalIcon stroke-width="1.5" size="24" class="text-grey100" />
                            </v-btn>
                        </template>
                        <v-list density="compact">
                            <v-list-item v-for="(item, i) in items" :key="i" :value="i">
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div> -->
            </div>

            <v-row>
                <v-col cols="12" class="pt-7">
                    <h2>Que Sintomas desea sanar?</h2>
                </v-col>
            </v-row>

            <!-- Uses/Symptoms Buttons Section -->
            <v-row class="mt-4">
                <v-col cols="12">
                    <div class="d-flex flex-wrap ga-2">
                        <v-btn
                            v-for="use in allUses"
                            :key="use"
                            :color="selectedUse === use ? 'primary' : 'default'"
                            :variant="selectedUse === use ? 'flat' : 'outlined'"
                            size="small"
                            rounded="lg"
                            @click="selectUse(use)"
                            class="text-capitalize"
                        >
                            {{ use }}
                        </v-btn>
                    </div>
                </v-col>
            </v-row>

            <!-- Plants Display Section -->
            <v-row class="mt-6">
                <v-col 
                    v-for="planta in filteredPlantas" 
                    :key="planta.id"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                >
                    <v-card 
                        elevation="2" 
                        rounded="lg"
                        class="h-100"
                        hover
                    >
                        <v-card-item>
                            <v-card-title class="text-h6 mb-2">
                                {{ planta.common_name_cr }}
                            </v-card-title>
                            <v-card-subtitle class="text-caption font-italic mb-3">
                                {{ planta.scientific_name }}
                            </v-card-subtitle>
                            
                            <div v-if="planta.description" class="text-body-2 mb-3">
                                {{ planta.description.substring(0, 100) }}{{ planta.description.length > 100 ? '...' : '' }}
                            </div>

                            <div v-if="planta.uses && planta.uses.length > 0">
                                <div class="text-caption font-weight-bold mb-1">Usos:</div>
                                <v-chip
                                    v-for="(use, index) in planta.uses.slice(0, 3)"
                                    :key="index"
                                    size="x-small"
                                    color="primary"
                                    variant="tonal"
                                    class="mr-1 mb-1"
                                >
                                    {{ use }}
                                </v-chip>
                                <div v-if="planta.uses.length > 3" class="text-caption text-grey">
                                    +{{ planta.uses.length - 3 }} más
                                </div>
                            </div>
                        </v-card-item>

                        <v-card-actions>
                            <v-btn 
                                color="primary" 
                                variant="text"
                                size="small"
                            >
                                Ver detalles
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Show message when no plants match the filter -->
            <v-row v-if="selectedUse && filteredPlantas.length === 0" class="mt-6">
                <v-col cols="12" class="text-center">
                    <v-alert
                        type="info"
                        variant="tonal"
                        rounded="lg"
                    >
                        No se encontraron plantas para el uso seleccionado: <strong>{{ selectedUse }}</strong>
                    </v-alert>
                </v-col>
            </v-row>
        </v-card-item>
    </v-card>
</template>
<!-- 
<style type="text/css">
.profit-expense .apexcharts-bar-series.apexcharts-plot-series .apexcharts-series path {
    clip-path: inset(0 0 5% 0 round 20px);
}
</style> -->