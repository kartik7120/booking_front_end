import { v4 as uuidv4 } from 'uuid';

export default {
    beforeCreate(event: any) {

        console.log("inside lifecycle beforeCreate hook for cast");

        const { data } = event.params;

        const uuid = uuidv4();

        console.log("generated uuid: ", uuid);

        data.starpi_cast_uid = uuid;

    }
}