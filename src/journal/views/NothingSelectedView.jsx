import { StarOutline } from "@mui/icons-material"
import { Grid } from "@mui/material"

export const NothingSelectedView = () => {
  return (
    <Grid 
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor:"primary.main", borderRadius:4}}
    >   
        <Grid item xs={12}>
            <StarOutline sx={{ fontSize:100, color:'white' }}/>
        </Grid>
        
    </Grid>
  )
}
