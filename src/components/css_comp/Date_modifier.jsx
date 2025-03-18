export default function Date_modifier(date){

    const d=date.split('-');
    const months={
        '1':'January',
        '2':'February',
        '3':'March',
        '4':'April',
        '5':'May',
        '6':'June',
        '7':'July',
        '8':'August',
        '9':'September',
        '10':'Octobor',
        '11':'November',
        '12':'December'
    }
    const modified_date=d[2]+'-'+months[d[1]]+'-'+d[0]
    return modified_date
}

