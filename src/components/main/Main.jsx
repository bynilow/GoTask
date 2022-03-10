import { Button, Card, Container, Paper, Typography } from "@mui/material";
import React from "react";
import s from "./main.module.css"
import phone from "../../images/phones.jpg"
import { NavLink } from "react-router-dom";
import { color } from "@mui/system";
import { createTheme } from '@mui/material/styles';

const Main = () => {
    

    

    return (
        <div className={s.main}>
            <div className={s.about}>
                <Container className={s.about_inner}>
                    <div className={s.about_left}>
                        <Typography variant="h3" color="white">
                        <Typography sx={{fontWeight: 'bold'}} variant="inherit" component="span" color="secondary">APPNAME</Typography> помогает эффективно решать рабочие и ежедневные задачи.
                        </Typography>
                        <Typography variant="h5" sx={{ mt: 5 }} color="white">
                            Управляйте проектами, решайте повседневные задачи и выводите продуктивность на новый уровень
                            вместе с <Typography sx={{fontWeight: 'bold'}} variant="inherit" component="span" color="secondary">APPNAME</Typography>.
                        </Typography>
                        <Button color='secondary' variant="contained" sx={{ mt: 5 }} size="large">
                            Узнать больше
                        </Button>
                    </div>
                    <div className={s.about_img}>
                        
                    </div>

                </Container>
            </div>
            <div className={s.start_left}>
                <div className={s.start_cont} >
                    <div className={s.start_one}>
                        <img src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE3HLIZ?ver=4268&q=90&h=675&w=830&b=%23FFFFFFFF&aim=true" alt="" />
                    </div>
                    <div className={s.start_two}>
                        <Typography variant="h4" className={s.head}>
                            Начните свое использование
                        </Typography>
                        <Typography variant="h5">
                            Разбивайте задачи на простые шаги, устанавливайте сроки и настраивайте напоминания для ежедневного контрольного списка, 
                            чтобы следить за осуществлением поставленных целей.
                        </Typography>
                    </div>
                </div>
            </div>

            <div className={s.start_right}>
                <div className={s.start_cont} >
                    
                    <div className={s.start_two}>
                        <Typography variant="h4" className={s.head}>
                            Начните свое использование
                        </Typography>
                        <Typography variant="h5">
                            Разбивайте задачи на простые шаги, устанавливайте сроки и настраивайте напоминания для ежедневного контрольного списка, 
                            чтобы следить за осуществлением поставленных целей.
                        </Typography>
                    </div>
                    <div className={s.start_one}>
                        <img src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE3HLIZ?ver=4268&q=90&h=675&w=830&b=%23FFFFFFFF&aim=true" alt="" />
                    </div>
                </div>
            </div>

            <div className={s.start_left}>
                <div className={s.start_cont} >
                    <div className={s.start_one} >
                        <img src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE3HLIZ?ver=4268&q=90&h=675&w=830&b=%23FFFFFFFF&aim=true" alt="" />
                    </div>
                    <div className={s.start_two}>
                        <Typography variant="h4" className={s.head}>
                            Начните свое использование
                        </Typography>
                        <Typography variant="h5">
                            Разбивайте задачи на простые шаги, устанавливайте сроки и настраивайте напоминания для ежедневного контрольного списка, 
                            чтобы следить за осуществлением поставленных целей.
                        </Typography>
                    </div>
                </div>
            </div>

            <div className={s.footer}>
                <Container>
                    <div className={s.footer_links}>
                        <Typography
                            component={NavLink}
                            to="/"
                            className={s.links}>
                            О нас
                        </Typography>
                        <Typography
                            component={NavLink}
                            to="/"
                            className={s.links}>
                            Помощь
                        </Typography>
                        <Typography
                            component={NavLink}
                            to="/"
                            className={s.links}>
                            Новости
                        </Typography>
                        <Typography
                            component={NavLink}
                            to="/"
                            className={s.links}>
                            Связь с нами
                        </Typography>
                    </div>
                    <Typography variant="h5" sx={{pt:5}}>
                        APPNAME
                    </Typography>
                    <Typography variant="h6">
                        © 2022. Все права защищены.
                    </Typography>
                </Container>
            </div>
        </div>
    )
}

export default Main