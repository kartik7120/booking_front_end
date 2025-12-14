import { v4 as uuidv4 } from 'uuid';

export default {
    beforeCreate(event) {

        console.log("inside lifecycle beforeCreate hook for movietimeslot");
        const { data } = event.params;

        const uuid = uuidv4();

        console.log("generated uuid: ", uuid);

        data.starpi_movie_time_slot_uid = uuid;
    }
}